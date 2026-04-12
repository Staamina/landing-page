import { useEffect, useState } from 'react';

/**
 * Extracts all CSS Custom Properties (variables) from the document's stylesheets.
 */
function getAllCSSVariableNames(): string[] {
  const cssVars = new Set<string>();

  try {
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        // Accessing cssRules might throw security error for cross-origin sheets
        const rules = sheet.cssRules;
        for (const rule of Array.from(rules)) {
          if (rule instanceof CSSStyleRule) {
            for (let i = 0; i < rule.style.length; i++) {
              const propName = rule.style[i];
              if (propName.startsWith('--')) {
                cssVars.add(propName.trim());
              }
            }
          }
        }
      } catch (e) {
        console.warn('Could not read stylesheet rules:', e);
      }
    }
  } catch (e) {
    console.warn('Error reading stylesheets:', e);
  }

  return Array.from(cssVars).sort();
}

interface Token {
  name: string;
  value: string;
}

function generateTailwindClassnames(cssVarName: string): string[] {
  if (!cssVarName.startsWith('--color-')) {
    return [];
  }

  const colorName = cssVarName.replace('--color-', '');
  const classnames: string[] = [];

  if (colorName.startsWith('text-')) {
    classnames.push(`text-${colorName}`);
  } else if (colorName.startsWith('border-') && !colorName.includes('radius')) {
    classnames.push(`border-${colorName}`, `bg-${colorName}`);
  } else if (colorName.startsWith('background-')) {
    classnames.push(`bg-${colorName}`);
  } else if (colorName.startsWith('action-')) {
    classnames.push(
      `bg-${colorName}`,
      `hover:bg-${colorName.replace('-hover', '')}-hover`
    );
  } else if (colorName.startsWith('semantic-')) {
    classnames.push(
      `bg-${colorName}`,
      `text-${colorName}`,
      `border-${colorName}`
    );
    if (colorName.includes('-bg')) {
      classnames.push(`bg-${colorName}`);
    }
    if (colorName.includes('-dark')) {
      classnames.push(`text-${colorName}`);
    }
  } else if (colorName.startsWith('brand-')) {
    classnames.push(
      `bg-${colorName}`,
      `text-${colorName}`,
      `border-${colorName}`
    );
    if (colorName.includes('-hover')) {
      classnames.push(`hover:bg-${colorName}`);
    }
  } else {
    classnames.push(
      `bg-${colorName}`,
      `text-${colorName}`,
      `border-${colorName}`
    );
  }

  return [...new Set(classnames)];
}

const TokenCard = ({ name, value }: Token) => {
  const isColor = (name: string, val: string) => {
    if (name.includes('opacity')) return false;
    if (
      name.includes('color') ||
      name.includes('bg') ||
      name.includes('border') ||
      name.includes('text') ||
      name.includes('fill') ||
      name.includes('overlay') ||
      name.includes('shadow') ||
      name.includes('primitive')
    )
      return true;
    if (
      val.trim().startsWith('#') ||
      val.trim().startsWith('rgba') ||
      val.trim().startsWith('hsla')
    )
      return true;
    return false;
  };

  const showPreview = isColor(name, value);
  const isText = name.includes('text');
  const isBorder = name.includes('border') && !name.includes('radius');
  const tailwindClassnames = generateTailwindClassnames(name);

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow">
      <div
        className="h-16 w-full rounded flex items-center justify-center border border-neutral-100 dark:border-neutral-800 text-sm overflow-hidden"
        style={{
          backgroundColor:
            showPreview && !isText && !isBorder
              ? `var(${name})`
              : 'transparent',
          borderColor: isBorder ? `var(${name})` : undefined,
          borderWidth: isBorder ? '4px' : '1px',
        }}
      >
        {!showPreview && <span className="text-gray-400 text-xs">Value</span>}
        {isText && (
          <span
            style={{ color: `var(${name})` }}
            className="text-2xl font-bold"
          >
            Aa
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <code className="text-[10px] font-bold text-neutral-900 dark:text-neutral-100 break-all">
          {name}
        </code>
        <code className="text-[9px] text-neutral-500 dark:text-neutral-400">
          {value}
        </code>
        {tailwindClassnames.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tailwindClassnames.map((className) => (
              <code
                key={className}
                className="text-[8px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono"
                title={`Tailwind class: ${className}`}
              >
                {className}
              </code>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TokenSection = ({
  title,
  description,
  tokens,
}: {
  title: string;
  description: string;
  tokens: Token[];
}) => {
  if (tokens.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-2 pb-2 border-b border-border">
        {title}
      </h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {tokens.map((t) => (
          <TokenCard key={t.name} {...t} />
        ))}
      </div>
    </div>
  );
};

export const TokenVisualizer = () => {
  const [tokens, setTokens] = useState<{ name: string; value: string }[]>([]);

  useEffect(() => {
    // We simply assume the CSS is loaded
    const names = getAllCSSVariableNames();
    const computed = getComputedStyle(document.documentElement);

    const extracted = names.map((name) => ({
      name,
      value: computed.getPropertyValue(name).trim(),
    }));

    setTokens(extracted);
  }, []);

  // Filter Layers
  const primitives = tokens.filter(
    (t) =>
      t.name.startsWith('--color-primitive-') && !t.name.includes('opacity')
  );
  const semantics = tokens.filter(
    (t) =>
      t.name.startsWith('--color-') && !t.name.startsWith('--color-primitive-')
  );
  const components = tokens.filter(
    (t) =>
      !t.name.startsWith('--color-primitive-') &&
      !t.name.startsWith('--color-') &&
      !t.name.startsWith('--radix')
  );

  // Group Primitives by scale
  const groupedPrimitives: { [key: string]: Token[] } = {};
  primitives.forEach((p) => {
    const scale = p.name.split('-')[3] || 'other'; // --color-primitive-purple-50 -> purple
    if (!groupedPrimitives[scale]) groupedPrimitives[scale] = [];
    groupedPrimitives[scale].push(p);
  });

  // Sort primitives numbers
  Object.keys(groupedPrimitives).forEach((k) => {
    groupedPrimitives[k].sort((a, b) => {
      const numA = parseInt(a.name.split('-').pop() || '0');
      const numB = parseInt(b.name.split('-').pop() || '0');
      return numA - numB;
    });
  });

  return (
    <div className="p-8 bg-background min-h-screen text-foreground font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Design Tokens</h1>
        <p className="text-muted-foreground mb-4">
          Staamina Design System Architecture: Primitives → Semantics →
          Components
        </p>
        <div className="bg-semantic-info-bg border border-semantic-info-light rounded-lg p-4 text-sm">
          <p className="font-semibold text-semantic-info-dark mb-2">
            ✨ Tailwind v4 Auto-Generated Classes
          </p>
          <p className="text-text-secondary">
            All semantic tokens (Layer 2) defined in{' '}
            <code className="text-xs bg-subtle px-1 py-0.5 rounded">
              @theme
            </code>{' '}
            automatically generate Tailwind utility classes. Use classes like{' '}
            <code className="text-xs bg-subtle px-1 py-0.5 rounded">
              bg-brand-primary
            </code>
            ,{' '}
            <code className="text-xs bg-subtle px-1 py-0.5 rounded">
              text-semantic-error
            </code>
            , or{' '}
            <code className="text-xs bg-subtle px-1 py-0.5 rounded">
              border-border-default
            </code>{' '}
            instead of{' '}
            <code className="text-xs bg-subtle px-1 py-0.5 rounded">
              var(--color-*)
            </code>
            .
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-2 pb-2 border-b border-border">
            Layer 1: Primitives
          </h2>
          <p className="text-muted-foreground mb-6">
            Raw color palette. Never use these directly in components.
          </p>

          {Object.entries(groupedPrimitives).map(([scale, scaleTokens]) => (
            <div key={scale} className="mb-6">
              <h3 className="uppercase text-sm font-semibold text-muted-foreground mb-3 tracking-wider">
                {scale}
              </h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
                {scaleTokens.map((t) => (
                  <TokenCard key={t.name} {...t} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <TokenSection
          title="Layer 2: Semantics"
          description="Meaningful functional tokens. These automatically generate Tailwind classes (e.g., bg-brand-primary, text-semantic-error). Use Tailwind classes in components instead of var()."
          tokens={semantics}
        />

        <TokenSection
          title="Layer 3: Components"
          description="Component-specific tokens."
          tokens={components}
        />
      </div>
    </div>
  );
};

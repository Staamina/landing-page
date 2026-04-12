# Architecture de Stockage de Fichiers

## Vue d'ensemble

Le module de stockage de fichiers de Staamina utilise une architecture basée sur le pattern Strategy, permettant de changer facilement de provider de stockage (MinIO, S3, Cloudflare R2) sans modifier le code métier.

## Architecture

### Principe d'abstraction

Tous les providers implémentent l'interface `IFileStorageService`, garantissant une compatibilité totale entre les différents services de stockage.

**Note importante :** Le système utilise le SDK AWS S3 (`@aws-sdk/client-s3`) qui est compatible avec :

- **MinIO** (développement local) - API S3-compatible
- **AWS S3** (production) - API native
- **Cloudflare R2** (production) - API S3-compatible
- **DigitalOcean Spaces** (production) - API S3-compatible

Un seul SDK pour tous les providers S3-compatibles !

```
┌─────────────────────────────────────┐
│   Code Métier (Incidents, etc.)     │
└──────────────┬──────────────────────┘
               │
               │ utilise
               ▼
┌─────────────────────────────────────┐
│   IFileStorageService (Interface)    │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┬──────────────┐
       │                │              │
       ▼                ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   MinIO     │  │  AWS S3      │  │ Cloudflare  │
│  (Dev)      │  │  (Prod)      │  │    R2       │
│             │  │              │  │  (Prod)     │
└─────────────┘  └─────────────┘  └─────────────┘
```

### Structure des fichiers

```
apps/backend/src/core/storage/
├── interfaces/
│   └── file-storage.interface.ts      # Interface abstraite
├── services/
│   └── minio-file-storage.service.ts  # Implémentation MinIO
├── config/
│   └── storage.config.ts               # Configuration centralisée
├── examples/
│   └── attachment-upload.example.ts   # Exemple d'utilisation
├── storage.module.ts                   # Module NestJS global
├── storage.constants.ts                # Tokens d'injection DI
└── README.md                           # Documentation technique
```

## Interface IFileStorageService

### Méthodes disponibles

```typescript
interface IFileStorageService {
  uploadFile(
    file: Buffer | Uint8Array,
    fileName: string,
    mimeType: string,
    path: string
  ): Promise<UploadFileResult>;

  deleteFile(key: string): Promise<void>;

  getFileUrl(key: string, expiresIn?: number): Promise<string>;

  getFileMetadata(key: string): Promise<FileMetadata>;

  fileExists(key: string): Promise<boolean>;
}
```

### Types de retour

```typescript
interface UploadFileResult {
  key: string; // Chemin complet dans le storage
  url: string; // URL signée temporaire
  size: number; // Taille en octets
  mimeType: string; // Type MIME du fichier
}

interface FileMetadata {
  key: string;
  size: number;
  mimeType: string;
  lastModified: Date;
}
```

## Configuration

### Variables d'environnement

#### Configuration générale

```env
# Provider à utiliser (minio | s3 | cloudflare-r2)
STORAGE_PROVIDER=minio

# Limites de fichiers
MAX_FILE_SIZE=10485760              # 10 MB par défaut
ALLOWED_MIME_TYPES=image/*,application/pdf
```

#### Configuration MinIO (Développement local)

```env
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET_NAME=staamina-attachments
```

#### Configuration AWS S3 (Production - à venir)

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_NAME=staamina-attachments-prod
```

#### Configuration Cloudflare R2 (Production - à venir)

```env
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-key
CLOUDFLARE_R2_BUCKET_NAME=staamina-attachments-prod
```

### Docker Compose

MinIO est configuré dans `docker-compose.dev.yml` :

```yaml
minio:
  image: minio/minio:latest
  container_name: dev-minio
  restart: unless-stopped
  ports:
    - '9000:9000' # API
    - '9001:9001' # Console web
  environment:
    MINIO_ROOT_USER: minioadmin
    MINIO_ROOT_PASSWORD: minioadmin
  command: server /data --console-address ":9001"
  volumes:
    - ./data/minio:/data
```

**Accès à la console MinIO :**

- URL : http://localhost:9001
- User : `minioadmin`
- Password : `minioadmin`

## Utilisation

### Injection de dépendance

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { FILE_STORAGE_SERVICE_TOKEN } from '@/core/storage/storage.constants';
import { IFileStorageService } from '@/core/storage/interfaces/file-storage.interface';

@Injectable()
export class IncidentAttachmentService {
  constructor(
    @Inject(FILE_STORAGE_SERVICE_TOKEN)
    private readonly fileStorage: IFileStorageService
  ) {}
}
```

### Upload d'un fichier

```typescript
async uploadAttachment(
  file: Buffer,
  fileName: string,
  mimeType: string,
  tenantId: string,
  incidentId: string,
) {
  const timestamp = Date.now();
  const sanitizedFileName = `${timestamp}-${fileName}`;
  const path = `tenant-${tenantId}/incidents/${incidentId}`;

  const result = await this.fileStorage.uploadFile(
    file,
    sanitizedFileName,
    mimeType,
    path,
  );

  return {
    s3Key: result.key,
    fileName: fileName,
    fileSize: result.size,
    mimeType: result.mimeType,
    url: result.url,
  };
}
```

### Génération d'URL signée

```typescript
async getAttachmentUrl(key: string, expiresInHours: number = 1): Promise<string> {
  const expiresInSeconds = expiresInHours * 3600;
  return await this.fileStorage.getFileUrl(key, expiresInSeconds);
}
```

### Suppression d'un fichier

```typescript
async deleteAttachment(key: string): Promise<void> {
  await this.fileStorage.deleteFile(key);
}
```

### Vérification d'existence

```typescript
async attachmentExists(key: string): Promise<boolean> {
  return await this.fileStorage.fileExists(key);
}
```

## Structure de stockage

### Organisation des fichiers

Les fichiers sont organisés par tenant et par ressource pour faciliter la gestion et l'isolation :

```
staamina-attachments/
├── tenant-{tenantId}/
│   ├── incidents/
│   │   ├── {incidentId}/
│   │   │   ├── {timestamp}-{filename}
│   │   │   └── thumbnails/
│   │   │       └── {timestamp}-{filename}
│   │   └── ...
│   ├── equipment/
│   │   └── {equipmentId}/
│   │       └── ...
│   └── ...
```

### Exemple de clé S3

```
tenant-abc123/incidents/inc-456/1704123456789-photo.jpg
```

## Sécurité

### Validation des fichiers

Avant l'upload, valider :

1. **Type MIME** : Vérifier que le type est dans `ALLOWED_MIME_TYPES`
2. **Taille** : Vérifier que la taille ne dépasse pas `MAX_FILE_SIZE`
3. **Nom de fichier** : Sanitizer le nom pour éviter les injections
4. **Scan antivirus** : Optionnel, recommandé en production

### URLs signées

- Toutes les URLs sont signées et temporaires
- Durée de vie par défaut : 1 heure
- Pas d'URLs publiques permanentes
- Isolation par tenant garantie

### Isolation multi-tenant

- Chaque tenant a son propre préfixe dans le bucket
- Impossible d'accéder aux fichiers d'un autre tenant
- Validation côté application avant chaque opération

## Migration vers production

### Étape 1 : Choisir le provider

Options recommandées :

- **AWS S3** : Standard de l'industrie, intégration AWS complète
- **Cloudflare R2** : Pas de frais de sortie, API S3-compatible
- **DigitalOcean Spaces** : Simple et économique

### Étape 2 : Configuration

Le service `FileStorageService` fonctionne déjà avec MinIO et AWS S3. Il suffit de changer la configuration !

**Aucune implémentation supplémentaire nécessaire** - le même service gère MinIO et AWS S3 grâce à la compatibilité de l'API S3.

Mettre à jour les variables d'environnement en production :

```env
STORAGE_PROVIDER=s3
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET_NAME=staamina-attachments-prod
```

### Étape 3 : Migration des données

Si des fichiers existent déjà dans MinIO, les migrer vers le nouveau provider :

1. Lister tous les fichiers dans MinIO
2. Télécharger chaque fichier
3. Uploader vers le nouveau provider
4. Mettre à jour les clés dans la base de données

## Tests

### Tests unitaires

Mocker l'interface `IFileStorageService` :

```typescript
const mockFileStorage: jest.Mocked<IFileStorageService> = {
  uploadFile: jest.fn(),
  deleteFile: jest.fn(),
  getFileUrl: jest.fn(),
  getFileMetadata: jest.fn(),
  fileExists: jest.fn(),
};
```

### Tests d'intégration

Utiliser MinIO en local pour les tests d'intégration :

```typescript
beforeAll(async () => {
  // MinIO démarre automatiquement avec docker-compose
  // Utiliser les credentials de dev
});
```

## Dépannage

### MinIO ne démarre pas

1. Vérifier que le port 9000/9001 n'est pas utilisé
2. Vérifier les permissions du dossier `./data/minio`
3. Vérifier les logs : `docker logs dev-minio`

### Erreur de connexion

1. Vérifier `MINIO_ENDPOINT` et `MINIO_PORT`
2. Vérifier que MinIO est démarré : `docker ps`
3. Tester la connexion : `curl http://localhost:9000/minio/health/live`

### Bucket non créé

Le bucket est créé automatiquement au démarrage. Si problème :

1. Accéder à la console MinIO : http://localhost:9001
2. Créer manuellement le bucket `staamina-attachments`

## Performance

### Optimisations recommandées

1. **Upload direct depuis le frontend** : Utiliser des URLs pré-signées pour upload direct
2. **CDN** : Configurer CloudFront/Cloudflare CDN pour la distribution
3. **Compression** : Compresser les images avant upload
4. **Thumbnails** : Générer des miniatures pour les images

### Limites

- Taille max par fichier : 10 MB (configurable)
- Types MIME autorisés : `image/*, application/pdf` (configurable)
- Durée de vie des URLs : 1 heure (configurable)

## Références

- [Documentation MinIO](https://min.io/docs/)
- [AWS S3 SDK](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-examples.html)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Module Storage README](../apps/backend/src/core/storage/README.md)

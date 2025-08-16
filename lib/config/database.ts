// Database configuration for scalability and performance

export const DATABASE_CONFIG = {
  // Connection pooling settings
  connectionPool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 60000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200,
  },

  // Query optimization settings
  queryOptimization: {
    // Enable query logging in development
    logQueries: process.env.NODE_ENV === 'development',
    
    // Slow query threshold (ms)
    slowQueryThreshold: 1000,
    
    // Default pagination limits
    defaultPageSize: 12,
    maxPageSize: 100,
    
    // Cache settings
    cacheEnabled: process.env.NODE_ENV === 'production',
    cacheTTL: 300, // 5 minutes
  },

  // Indexing strategy
  indexes: {
    // Core indexes for performance
    courses: [
      'slug',
      'isPublished',
      'categoryId',
      'ownerId',
      'createdAt',
      'averageRating',
      'enrollCount',
      ['isPublished', 'categoryId'],
      ['isPublished', 'level'],
      ['isPublished', 'createdAt'],
    ],
    
    users: [
      'email',
      'username',
      'isActive',
      'createdAt',
    ],
    
    enrollments: [
      'studentId',
      'courseId',
      'enrolledAt',
      'completedAt',
      'paymentStatus',
      ['studentId', 'courseId'], // Composite unique
    ],
    
    lessonProgress: [
      'enrollmentId',
      'lessonId',
      'isCompleted',
      ['enrollmentId', 'lessonId'], // Composite unique
    ],
    
    reviews: [
      'courseId',
      'authorId',
      'rating',
      'createdAt',
    ],
    
    analytics: [
      'userId',
      'courseId',
      'event',
      'createdAt',
    ],
  },

  // Backup and maintenance
  maintenance: {
    // Auto-vacuum settings
    autoVacuum: true,
    vacuumSchedule: '0 2 * * 0', // Weekly at 2 AM Sunday
    
    // Backup settings
    backupEnabled: process.env.NODE_ENV === 'production',
    backupSchedule: '0 1 * * *', // Daily at 1 AM
    backupRetention: 30, // days
    
    // Archive old data
    archiveEnabled: true,
    archiveAfterDays: 365,
  },

  // Security settings
  security: {
    // Row Level Security (RLS) policies
    enableRLS: true,
    
    // Audit logging
    auditEnabled: process.env.NODE_ENV === 'production',
    auditTables: ['users', 'courses', 'enrollments', 'payments'],
    
    // Data encryption
    encryptSensitiveFields: true,
    encryptedFields: ['email', 'paymentInfo'],
  },

  // Performance monitoring
  monitoring: {
    // Enable performance tracking
    trackPerformance: true,
    
    // Metrics to track
    metrics: [
      'query_duration',
      'connection_count',
      'cache_hit_ratio',
      'slow_queries',
      'error_rate',
    ],
    
    // Alerting thresholds
    alerts: {
      slowQueryThreshold: 2000, // ms
      highConnectionCount: 80, // % of max
      lowCacheHitRatio: 0.8, // 80%
      highErrorRate: 0.05, // 5%
    },
  },
}

// Environment-specific configurations
export const getEnvironmentConfig = () => {
  const env = process.env.NODE_ENV || 'development'
  
  const configs = {
    development: {
      logLevel: 'debug',
      enableQueryLogging: true,
      cacheEnabled: false,
      strictMode: false,
    },
    
    staging: {
      logLevel: 'info',
      enableQueryLogging: true,
      cacheEnabled: true,
      strictMode: true,
    },
    
    production: {
      logLevel: 'warn',
      enableQueryLogging: false,
      cacheEnabled: true,
      strictMode: true,
      enableMonitoring: true,
      enableBackups: true,
    },
  }
  
  return configs[env as keyof typeof configs] || configs.development
}

// Supabase-specific optimizations
export const SUPABASE_CONFIG = {
  // Connection settings
  connection: {
    // Use connection pooling for better performance
    poolMode: 'transaction',
    
    // Enable prepared statements
    preparedStatements: true,
    
    // Connection timeout
    connectionTimeout: 30000,
    
    // Statement timeout
    statementTimeout: 60000,
  },

  // Real-time settings
  realtime: {
    // Enable for specific tables only
    enabledTables: [
      'notifications',
      'messages',
      'forum_posts',
      'forum_replies',
    ],
    
    // Throttle settings
    throttle: {
      maxEventsPerSecond: 100,
      maxConcurrentConnections: 1000,
    },
  },

  // Storage settings
  storage: {
    // File upload limits
    maxFileSize: 50 * 1024 * 1024, // 50MB
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/webm',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    
    // CDN settings
    cdnEnabled: true,
    cacheControl: 'public, max-age=31536000', // 1 year
  },

  // Auth settings
  auth: {
    // Session settings
    sessionTimeout: 24 * 60 * 60, // 24 hours
    refreshTokenRotation: true,
    
    // Security settings
    enableMFA: true,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    },
  },
}

// Cost optimization strategies
export const COST_OPTIMIZATION = {
  // Query optimization
  queries: {
    // Use select only needed fields
    selectOnlyNeeded: true,
    
    // Implement pagination everywhere
    alwaysPaginate: true,
    
    // Use database functions for complex calculations
    useDatabaseFunctions: true,
    
    // Batch operations when possible
    batchOperations: true,
  },

  // Storage optimization
  storage: {
    // Compress images automatically
    autoCompress: true,
    
    // Use appropriate image formats
    preferWebP: true,
    
    // Implement lazy loading
    lazyLoading: true,
    
    // Clean up unused files
    cleanupSchedule: '0 3 * * 0', // Weekly cleanup
  },

  // Caching strategy
  caching: {
    // Cache frequently accessed data
    cacheStrategies: {
      courses: { ttl: 300, strategy: 'lru' }, // 5 minutes
      categories: { ttl: 3600, strategy: 'lru' }, // 1 hour
      userProfiles: { ttl: 900, strategy: 'lru' }, // 15 minutes
      courseContent: { ttl: 1800, strategy: 'lru' }, // 30 minutes
    },
    
    // Cache invalidation
    invalidationRules: {
      courseUpdate: ['courses', 'courseContent'],
      userUpdate: ['userProfiles'],
      categoryUpdate: ['categories'],
    },
  },

  // Resource management
  resources: {
    // Connection pooling
    useConnectionPooling: true,
    
    // Lazy loading of relations
    lazyLoadRelations: true,
    
    // Implement soft deletes
    useSoftDeletes: true,
    
    // Archive old data
    archiveOldData: true,
  },
}
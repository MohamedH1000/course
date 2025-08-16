#!/usr/bin/env tsx

/**
 * Test database connection script
 * Run this to diagnose connection issues
 */

import { PrismaClient } from '@prisma/client'

async function testConnection() {
  console.log('🔍 Testing database connection...')
  
  // Test with different connection strings
  const connections = [
    {
      name: 'Direct Connection',
      url: process.env.DIRECT_URL
    },
    {
      name: 'Pooled Connection', 
      url: process.env.DATABASE_URL
    }
  ]
  
  for (const conn of connections) {
    console.log(`\n📡 Testing ${conn.name}...`)
    console.log(`URL: ${conn.url?.replace(/:[^:@]*@/, ':****@')}`)
    
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: conn.url
        }
      }
    })
    
    try {
      // Test basic connection
      await prisma.$connect()
      console.log('✅ Connection successful')
      
      // Test query
      const result = await prisma.$queryRaw`SELECT version()`
      console.log('✅ Query successful')
      
      // Test table creation (simple test)
      await prisma.$queryRaw`SELECT 1 as test`
      console.log('✅ Database accessible')
      
    } catch (error: any) {
      console.error('❌ Connection failed:', error.message)
      
      // Provide specific error guidance
      if (error.message.includes('Can\'t reach database server')) {
        console.log('💡 Possible solutions:')
        console.log('   1. Check if your Supabase project is paused')
        console.log('   2. Verify your database password')
        console.log('   3. Check your internet connection')
        console.log('   4. Try the Supabase dashboard to wake up the database')
      }
      
      if (error.message.includes('password authentication failed')) {
        console.log('💡 Password issue - check your database password in Supabase settings')
      }
      
      if (error.message.includes('timeout')) {
        console.log('💡 Connection timeout - your project might be starting up')
      }
    } finally {
      await prisma.$disconnect()
    }
  }
}

// Also test environment variables
function checkEnvironment() {
  console.log('\n🔧 Checking environment variables...')
  
  const required = [
    'DATABASE_URL',
    'DIRECT_URL', 
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]
  
  for (const env of required) {
    if (process.env[env]) {
      console.log(`✅ ${env}: Set`)
    } else {
      console.log(`❌ ${env}: Missing`)
    }
  }
}

async function main() {
  checkEnvironment()
  await testConnection()
  
  console.log('\n🎯 Next steps if connection fails:')
  console.log('1. Go to https://supabase.com/dashboard')
  console.log('2. Select your project: mkpqsmklxymivoxthbuv')
  console.log('3. Check if project is paused - click "Resume" if needed')
  console.log('4. Go to Settings > Database and verify connection strings')
  console.log('5. Make sure your IP is not blocked by any firewall')
}

main().catch(console.error)
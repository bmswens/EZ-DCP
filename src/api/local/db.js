import Dexie from 'dexie'

const db = new Dexie('ez-dcp')
db.version(1).stores({
  projects: '++id, name, holeNumber, lat, lon, section, datetime',
  blows: '[projectId+blowNumber], datetime, depth'
})

export default db
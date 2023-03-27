import Dexie from 'dexie'

const db = new Dexie('ez-dcp')
db.version(1).stores({
  projects: '++id, location, station, serialNum, testNum, lat, lon, datetime',
  blows: '[projectId+blowNumber], datetime, depth'
})

export default db
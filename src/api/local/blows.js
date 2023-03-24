import db from "./db"

async function add(projectId, depth) {
    let data = {
        projectId,
        depth,
        datetime: new Date()
    }
    let blows = await db.blows.where("projectId").equals(projectId).toArray()
    data.blowNumber = blows.length + 1
    await db.blows.add(data)
}

async function getByProject(projectId) {
    return await db.blows.where('projectId').equals(projectId).toArray()
}

const blows = {
    add,
    getByProject
}

export default blows
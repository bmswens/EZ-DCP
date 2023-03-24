import db from "./db"

async function add(project) {
    project.datetime = new Date()
    await db.projects.add(project)
}

async function getAll() {
    return await db.projects.toArray()
}

async function getByID(id) {
    let output =  await db.projects.where('id').equals(id).first()
    return output
}

const projects = {
    add,
    getAll,
    getByID
}

export default projects
import FirebaseAdmin from 'firebase-admin'
import { v4 as uuidv4 } from 'uuid'
import { readFile } from 'fs/promises'

const cert = JSON.parse(
  await readFile(
    new URL(process.env.FIREBASE_CERT_PATH, import.meta.url)
  )
)

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(cert)
})

console.log('Conectados a Firebase!')

let targetId

async function create() {
  try {
    const db = FirebaseAdmin.firestore()
    const query = db.collection('colores')
    let id = uuidv4()
    let doc = query.doc(id) 
    await doc.create({ nombre: 'red' })
    id = uuidv4()
    doc = query.doc(id)
    await doc.create({ nombre: 'green' })
    targetId = id = uuidv4()
    doc = query.doc(id)
    await doc.create({ nombre: 'blue' })
    console.log('[create] Colores creados con éxito!')
  } catch (error) {
    console.error('[create] Ocurrio un error ->', error.message)
  }
}

async function readAll(query) {
  try {
    const db = FirebaseAdmin.firestore()
    const query = db.collection('colores')
    const querySnapshot = await query.get()
    let docs = querySnapshot.docs
    const response = docs.map(doc => ({ id: doc.id, ...doc.data() }))
    console.log('[readAll] Colores obtenidos con éxito! ->', response)
  } catch (error) {
    console.error('[readAll] Ocurrio un error al intentar obtener colores  ->', error.message)
  }
}

async function readByName(name) {
  try {
    const db = FirebaseAdmin.firestore()
    const query = db.collection('colores')
    const snapshot = await query.where('nombre', '==', name).get()
    if (!snapshot.empty) {
      console.log(`[readByName] Color ${name} obtenido con éxito! ->`, snapshot.docs[0].data())
    } else {
      console.log(`[readByName] Color ${name} no encontrado`)
    }
  } catch (error) {
    console.error(`[readByName] Ocurrio un error al intenter obtener color ${name} ->`, error.message)
  }
}

async function updateByName(name, data) {
  try {
    const db = FirebaseAdmin.firestore()
    const query = db.collection('colores')
    const snapshot = await query.where('nombre', '==', name).get()
    if (!snapshot.empty) {
      const doc = query.doc(snapshot.docs[0].id)
      await doc.update(data)
      console.log(`[updateByName] Color ${name} actualizado con éxito!`)
    } else {
      console.log(`[updateByName] Color ${name} no encontrado`)
    }
  } catch (error) {
    console.error(`[updateByName] Ocurrio un error al intentar actualizar color ${name} ->`, error.message)
  }
}

async function deleteByName(name) {
  try {
    const db = FirebaseAdmin.firestore()
    const query = db.collection('colores')
    const snapshot = await query.where('nombre', '==', name).get()
    if (!snapshot.empty) {
      const doc = query.doc(snapshot.docs[0].id)
      await doc.delete()
      console.log(`[deleteByName] Color ${name} eliminado con éxito!`)
    } else {
      console.log(`[deleteByName] Color ${name} no encontrado`)
    }
  } catch (error) {
    console.error(`[deleteByName] Ocurrio un error al intentar eliminado color ${name} ->`, error.message)
  }
}

await create()
await readAll()
await readByName('blue')
await updateByName('blue', { nombre: 'navy' })
await readAll()
await deleteByName('green')
await readAll()

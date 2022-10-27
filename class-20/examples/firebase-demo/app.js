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

async function createUsers() {
  try {
    const db = FirebaseAdmin.firestore()
    const query = db.collection('users')
    let id = uuidv4()
    let doc = query.doc(id)
    await doc.create({ nombre: 'Maravillas Ramos', edad: 25 })
    id = uuidv4()
    doc = query.doc(id)
    await doc.create({ nombre: 'Teofilo Morillo', edad: 33 })
    targetId = id = uuidv4()
    doc = query.doc(id)
    await doc.create({ nombre: 'Imane Montaño', edad: 29 })
    id = uuidv4()
    doc = query.doc(id)
    await doc.create({ nombre: 'Ivet Jaramillo', edad: 26 })
    console.log('[createUsers] Usuarios creados con éxito!')
  } catch (error) {
    console.error('[createUsers] Ocurrio un error ->', error.message)
  }
}

async function readAll() {
  try {
    const db = FirebaseAdmin.firestore()
    const query = db.collection('users')
    const querySnapshot = await query.get()
    let docs = querySnapshot.docs
    const response = docs.map(doc => ({ id: doc.id, ...doc.data() }))
    console.log('[readAll] Usuarios obtenidos con éxito! ->', response)
  } catch (error) {
    console.error('[readAll] Ocurrio un error al intentar obtener usuarios  ->', error.message)
  }
}

async function readById(id) {
  try {
    const db = FirebaseAdmin.firestore()
    const query = db.collection('users')
    const doc = query.doc(id)
    const item = await doc.get()
    const response = item.data()
    if (response) {
      console.log(`[readById] Usuario ${id} obtenido con éxito! ->`, response)
    } else {
      console.log(`[readById] Usuario ${id} no encontrado`)
    }
  } catch (error) {
    console.error(`[readById] Ocurrio un error al intenter obtener usuario ${id} ->`, error.message)
  }
}

async function updateById(id, data) {
  try {
    const db = FirebaseAdmin.firestore()
    const query = db.collection('users')
    const doc = query.doc(id)
    await doc.update(data)
    console.log(`[updateById] Usuario ${id} actualizado con éxito!`)
  } catch (error) {
    console.error(`[updateById] Ocurrio un error al intentar actualizar usuario ${id} ->`, error.message)
  }
}

async function deleteById(id) {
  try {
    const db = FirebaseAdmin.firestore()
    const query = db.collection('users')
    const doc = query.doc(id)
    await doc.delete()
    console.log(`[deleteById] Usuario ${id} eliminado con éxito!`)
  } catch (error) {
    console.error(`[deleteById] Ocurrio un error al intentar eliminado usuario ${id} ->`, error.message)
  }
}

await createUsers()
await readAll()
await readById(targetId)
await updateById(targetId, { correo: 'qwerty@gmail.com' })
await readById(targetId)
await deleteById(targetId)
await readAll()

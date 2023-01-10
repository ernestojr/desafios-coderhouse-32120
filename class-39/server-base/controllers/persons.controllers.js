import persons from '../models/presons.model.js'

export function get(req, res) {
  res.render('persons', { persons: persons.get() })
}

export function getJSON(req, res) {
  res.json(persons.get())
}

export function create(req, res) {
  persons.create(req.body)
  res.redirect('/html-onwire')
}

export function createJSON(req, res) {
  const result = persons.create(req.body)
  res.json(result)
}

export default {
  get,
  getJSON,
  create,
  createJSON,
}
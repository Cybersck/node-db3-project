const db = require('../data/dbconfig');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes').where({id}).first();
}

function findSteps(id) {
    return db('steps').where('scheme_id', id)
    .join('schemes', 'steps.scheme_id', 'schemes.id')
    .select('steps.id', 'steps.step_number','steps.instructions', 'schemes.scheme_name');
}

function add(scheme) {
    return db('schemes').insert(scheme).then(ids => {
        return findById(ids[0]);
    });
}

function update(changes, id) {
    return db('schemes').where({id}).update(changes);
}

function remove(id) {
    return db('schemes').where('id', id).del();
}
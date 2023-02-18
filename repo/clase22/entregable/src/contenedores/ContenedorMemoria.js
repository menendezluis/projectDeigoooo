class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    getById(id) {
        const elem = this.elementos.find(elem => elem.id == id)
        return elem || { error: `elemento no encontrado` }
    }

    getAll() {
        return [...this.elementos]
    }

    save(elem) {

        let newId
        if (this.elementos.length == 0) {
            newId = 1
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        this.elementos.push(newElem)
        return newElem
    }

    update(elem, id) {
        const newElem = { id: Number(id), ...elem }
        const index = this.elementos.findIndex(p => p.id == id)
        if (index == -1) {
            return { error: `elemento no encontrado` }
        } else {
            this.elementos[index] = newElem
            return newElem
        }
    }

    deleteById(id) {
        const index = this.elementos.findIndex(elem => elem.id == id)
        if (index == -1) {
            return { error: `elemento no encontrado` }
        } else {
            return this.elementos.splice(index, 1)
        }
    }

    deleteAll() {
        this.elementos = []
    }
}

export default ContenedorMemoria

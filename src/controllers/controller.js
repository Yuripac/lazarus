class Controller {
  constructor(service) {
    this.service = service
    this.getAll = this.getAll.bind(this)
    this.insert = this.insert.bind(this)
  }

  async getAll(req, res) {
    return res.status(200).send(await this.service.getAll(req.query))
  }

  async insert(req, res) {
    let serviceRes = await this.service.insert(req.body)

    return res.status(serviceRes.statusCode).send(serviceRes)
  }

  async update(req, res) {
    const { id } = req.params
    let serviceRes = await this.service.update(id, req.body)

    return res.status(serviceRes.statusCode).send(serviceRes)
  }

  async destroy(req, res) {
    const { id } = req.params
    let serviceRes = await this.service.delete(id)

    return res.status(serviceRes.statusCode).send(serviceRes)
  }
}

export default Controller
import mongoose from 'mongoose'

class Service {
  constructor(model) {
    this.model = model
  }

  async getAll(query) {
    let { skip, limit } = query

    skip = skip ? Number(skip) : 0
    limit = limit ? Number(skip) : 10

    delete query.skip
    delete query.limit

    try {
      let items = await this.model
        .find(query)
        .skip(skip)
        .limit(limit)
      let total = await this.model.count()

      return {
        error: false,
        statusCode: 200,
        data: items,
        total
      }
    } catch (errors) {
      return {
        error: true,
        status: 500,
        errors
      }
    }
  }

  async insert(data) {
    try {
      let item = await this.model.create(data)
      if (item) {
        return {
          error: false,
          item
        }
      }
    } catch (err) {
      console.log('error', err)
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || 'Not able to create item',
        errors: err.errors
      }
    }
  }

  async update(id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true })
      return {
        error: false,
        statusCode: 202,
        item
      }
    } catch(errors) {
      return {
        error: true,
        status: 500,
        errors
      }
    }
  }

  async delete(id) {
    try {
      let item = await this.model.findByIdAndDelete(id)
      if (!item) {
        return {
          error: true,
          statusCode: 404,
          message: 'Item not found'
        }
      }
      return {
        error: false,
        deleted: true,
        statusCode: 302,
        item
      }
    } catch(error) {
      return {
        error: true,
        statusCode: 500,
        error,
      }
    }
  }
}

export default Service
import mongoose from 'mongoose'
class Service {
  constructor(model) {
    this.model = model
  }

  async getAll(query) {
    let { skip, limit } = query

    skip = skip ? Number(skip) : 0
    limit = limit ? Number(limit) : 10

    delete query.skip
    delete query.limit

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id)
      } catch (err) {
        console.log('not able to generate mongoose id with content', query._id)
      }
    }

    try {
      let items = await this.model.find(query).skip(skip).limit(limit)
      let total = await this.model.count()

      return {
        error: false,
        statusCode: 200,
        data: items,
        total,
      }
    } catch (err) {
      return this.internalError(err)
    }
  }

  async insert(data) {
    try {
      let item = await this.model.create(data)
      if (item) {
        return {
          error: false,
          statusCode: 201,
          item,
        }
      }
    } catch (err) {
      return this.badRequest(err.errors)
    }
  }

  async update(id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      })
      return item
        ? {
            error: false,
            statusCode: 202,
            item,
          }
        : this.notFound()
    } catch (err) {
      const error = err.errors || err
      return this.badRequest(error)
    }
  }

  async delete(id) {
    try {
      let item = await this.model.findByIdAndDelete(id)
      return item
        ? {
            error: false,
            statusCode: 302,
            item,
          }
        : this.notFound()
    } catch (err) {
      return this.internalError(err)
    }
  }

  notFound() {
    return {
      error: true,
      statusCode: 404,
      message: 'Item not found',
    }
  }

  internalError(errors) {
    return this.errorResult(500, errors)
  }

  badRequest(errors) {
    return this.errorResult(400, errors)
  }

  errorResult(code, errors) {
    return {
      error: true,
      statusCode: code,
      errors,
    }
  }
}

export default Service

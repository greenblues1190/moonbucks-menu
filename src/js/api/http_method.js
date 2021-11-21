const HTTP_METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    }
  },
  DELETE() {
    return {
      method: 'DELETE',
    }
  }
}

export default HTTP_METHOD;
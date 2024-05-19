import BaseService from './BaseService'

const ApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseService.post('/api/v1/api-token-auth/', param.data)
                .then((response) => {
                    console.log('API Response:', response);
                    resolve(response)
                })
                .catch((errors) => {
                    console.error('API Errors:', errors);
                    reject(errors)
                })
                .finally(() => {
                    console.log("finally");
                })
           
            
        })
    },
}

export default ApiService

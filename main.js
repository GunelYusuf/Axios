//Axios Globals
axios.defaults.headers.common['X-Auth-Toke'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function getTodos() {
    // console.log('Get Request');
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit: 7
    //     }
    // })
    //     .then(res => showOutput(res))
    //     .catch(err => console.log(err));
    axios
        .get('https://jsonplaceholder.typicode.com/users',{timeout:5000})
        .then(res => showOutput(res))
        .catch(err => console.log(err));
};

function addTodo() {
    axios
        .post('https://jsonplaceholder.typicode.com/users', {
            method: 'post',
            title: 'New ToDo',
            complited: false
        })
        .then(res => showOutput(res))
        .catch(err => console.log(err))
};

function updateTodo() {
    // console.log('Put/Patch Request');
    axios
        .put('https://jsonplaceholder.typicode.com/users/1', {
            method: 'put',
            title: 'Update ToDo',
            complited: true
        })
        .then(res => showOutput(res))
        .catch(err => console.log(err));
};

function removeTodo() {
    // console.log('Delete Request');
    axios
        .delete('https://jsonplaceholder.typicode.com/users/1')
        .then(res => showOutput(res))
        .catch(err => console.log(err))
};

function getData() {
    // console.log('Simultaneous Request');
    axios
        .all([
            axios.get('https://jsonplaceholder.typicode.com/users?_limit=7'),
            axios.get('https://jsonplaceholder.typicode.com/posts?_limit=7')
        ])
        .then(axios.spread((todos, posts) => showOutput(todos))

            // res=>
            // { console.log(res[0]);
            //   console.log(res[1]);
            //   showOutput(res[0]);
            // }
        )
        .catch(err => console.log(err))
};

function customHeaders() {
    // console.log('Custom Headers');
    const config = {
        headers: {
            'Content Type': 'application/json',
            Authorization: 'sometoken'
        }
    }
    axios
        .post('https://jsonplaceholder.typicode.com/users', {
            title: "New ToDo",
            complited: false
        },
            config
        )
        .then(res => showOutput(res))
        .catch(err => console.log(err));

};

function transformResponse() {
    // console.log('Transform Response');
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/users',
        data: {
            title: 'Hi Gunel'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    }
    axios(options).then(res => showOutput(res))
};

function errorHandling() {
    // console.log('Error Handling');
    axios
        .get('https://jsonplaceholder.typicode.com/usersgu',{
           validateStatus:function(status) {
               return status <500
           }
        })
        .then(res => showOutput(res))
        .catch(err => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if (err.response.status === 404) {
                    alert('Error: Page Not Found');
                }
            } else if (err.request) {
                console.error(err.request);
            } else {
                console.error(err.message);
            }
        });
};

function cancelToken() {
    // console.log('Cancel Token');
    const source = axios.CancelToken.source();
    axios
        .get('https://jsonplaceholder.typicode.com/users', {
            cancelToken: source.token
        })
        .then(res => showOutput(res))
        .catch(thrown => {
            if (axios.isCancel(thrown)) {
                console.log(`Request canceled`, thrown.message);
            }
        });
    if (true) {
        source.cancel('Request canceled!')
    }

};

//Instance axios
const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});
axiosInstance.get('/comments').then(res => showOutput(res));

//Intercepting Requests & Respones
axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);

    return config;
},
    error => {
        return Promise.reject(error);
    })



function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5> 
    </div> 
    
    <div class="card mt-3">
    <div class="card-header">
    Headers
    </div>
    <div class="card-body">
    <pre> ${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
    </div>

    <div class="card mt-3">
    <div class="card-header">
    Data
    </div>
    <div class="card-body">
    <pre> ${JSON.stringify(res.data, null, 2)}</pre>
    </div>
    </div>

    <div class="card mt-3">
    <div class="card-header">
    Data
    </div>
    <div class="card-body">
    <pre> ${JSON.stringify(res.config, null, 2)}</pre>
    </div>
    </div>

   `;
}

//Event Listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
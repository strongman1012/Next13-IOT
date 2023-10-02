
    const serverAddress = 'http://127.0.0.1:5231/api/'
    export function shandleAdd (url, data) {
        let surl = serverAddress + url;
        let res;
        console.log(surl);  
        fetch (serverAddress + url, {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
          }).then (res => res.json());
        return res;
    }

    export function shandleDelete (url, data) {
        let surl = serverAddress + url + '?' +  data;
        let res;
        console.log(surl);  
        fetch (serverAddress + url + '?' + data, {
            method: 'DELETE',
            headers: {
              "Content-Type": 'application/json'
            },
          }).then (res => res.json());
        return res;
    }

    export function shandleUpdate (url, data) {
        let res;
        fetch (serverAddress + url, {
          method: 'PUT',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(data)
        }).then (res => res.json());
        return res;
      } 
      

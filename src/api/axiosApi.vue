import axios from "axios";

export function axiosPost(url,param){
	return new Promise((resolve,reject)=>{
		axios.post(url,param)
		.then(response => {
                return response
            })
		.catch((error)=>{
			console.log(error)
		})
	})
}


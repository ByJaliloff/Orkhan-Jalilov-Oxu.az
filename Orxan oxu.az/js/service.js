
async function getAllNews() {
   try {
    const res = await fetch('https://6806bdc9e81df7060eb80175.mockapi.io/news')
    if(!res.ok) {
        throw new Error(`${res.status} fetchde xeta bas verdi`)
    }
    const data = await res.json()
    return data
   } catch (error) {
    console.log(error.message);
    
   } 
}

async function deleteNewsById(id) {
    try {
     const res = await fetch(`https://6806bdc9e81df7060eb80175.mockapi.io/news/${id}`, {
        method: 'DELETE'
     })
     if(!res.ok) {
         throw new Error(`${res.status} fetchde xeta bas verdi`)
     }
     const data = await res.json()
     return data
    } catch (error) {
     console.log(error.message);
     
    } 
 }

 async function createNews(news) {
    try {
     const res = await fetch(`https://6806bdc9e81df7060eb80175.mockapi.io/news`,{
        method: 'POST',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(news)
     })
     if(!res.ok) {
         throw new Error(`${res.status} fetchde xeta bas verdi`)
     }
     const data = await res.json()
     return data
    } catch (error) {
     console.log(error.message);
     
    } 
 }
 async function editNews(news, id) {
    try {
        const res = await fetch(`https://6806bdc9e81df7060eb80175.mockapi.io/news/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(news)
        });
        if (!res.ok) {
            throw new Error(`PUT əməliyyatında xəta baş verdi. Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}


  async function updateNews(id, updatedData) {
    try {
        const res = await fetch(`https://6806bdc9e81df7060eb80175.mockapi.io/news/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!res.ok) {
            throw new Error(`${res.status} put requestində xəta baş verdi`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}



export{
    getAllNews,
    deleteNewsById,
    createNews,
    editNews,
    updateNews
}
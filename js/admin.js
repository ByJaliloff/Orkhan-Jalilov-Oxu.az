import { createNews, deleteNewsById, getAllNews, editNews } from "./service.js";

let data = []
const tBody = document.querySelector('tbody')
const form = document.querySelectorAll('#form input, #form textarea')
const categorySec = document.querySelector('#category')

 async function getData() {
    data = await getAllNews()
    console.log(data);
    printTable()
    
}
getData()

function printTable() {
    tBody.innerHTML= ""
    data.forEach(news => {
        tBody.innerHTML += `<tr class="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-600">
    <th scope="row" class="px-6 py-3 font-medium text-gray-100 whitespace-nowrap dark:text-white">
        ${news.title}
    </th>
    <td class="px-6 py-3 text-gray-300">
        ${news.content.slice(0, 40)}...
    </td>
    <td class="px-6 py-3 text-gray-300">
        ${news.category}
    </td>
    <td class="px-6 py-3 text-gray-300">
        ${news.like}, ${news.dislike}, ${news.view}
    </td>
    <td class="w-[50px] p-1">
        <img class="h-[50px] object-cover w-full rounded" src="${news.img}" alt="news image">
    </td>
    <td class="px-6 py-3 text-gray-300">
        ${news.date}
    </td>
    <td class="px-6 py-3 flex space-x-4">
        <i onclick="handleEditFill('${news.id}')" class="fa-solid fa-pen-to-square text-green-400 hover:text-green-600 text-[25px] cursor-pointer"></i>
        <i onclick="handleDelete('${news.id}')" class="fa-solid fa-trash text-red-400 hover:text-red-600 text-[25px] cursor-pointer"></i>
    </td>
</tr>

        `
    })
}

window.handleDelete = async (id) => {
    await deleteNewsById(id)
    data = data.filter(item => item.id !== id)
    printTable()
}


window.handlePost = async () => {
    const news = getVal()
    const resNews = await createNews(news)
    if (resNews) {
        data.push(resNews)
    }
    printTable()

    form.forEach(input => {
        input.value = ''
    });
    categorySec.value = '';
}


let globId = null;

window.handleEditFill = (id) => {
    const element = data.find(item => item.id === id);
    if (element) {
        form[0].value = element.title;
        form[1].value = element.img;
        form[2].value = element.date;
        form[3].value = element.content;
        categorySec.value = element.category;
        
        globId = id; 
        document.querySelector('[data-modal-toggle="crud-modal"]').click();
    }
}

window.handleEdit = async () => {
    if (!globId) return; 

    const updatedNews = getVal();
    updatedNews.id = globId;

    try {
        const res = await editNews(updatedNews, globId);
        const index = data.findIndex(item => item.id === globId);
        if (index !== -1) {
            data[index] = res; 
        }

        document.querySelector('[data-modal-toggle="crud-modal"]').click();

        printTable(); 
        
        form.forEach(input => {
            input.value = ''
        });
        categorySec.value = ''; 

        globId = null;

    } catch (error) {
        console.error("Edit zamanı xəta baş verdi:", error);
    }
}


function getVal() {
    const news = {
        title: form[0].value,
        img: form[1].value,
        date: form[2].value,
        content: form[3].value,
        category: categorySec.value,
        like: 0,
        dislike: 0,
        view:0
    }

    return news
}
import { apiUrl } from "./consts"

export const generateAvatarUrl = (id) => {
    return `${apiUrl}/user/avatar?id=${id}`
}

export const generateCategoryImage = (id) => {
    return `${apiUrl}/category/image?id=${id}`
}

export const generateThumnailImage = (id) => {
    return `${apiUrl}/blog/thumnail?id=${id}`
}

export const num2Vec = (num) => {
    var arr = []
    for (var i =1; i<=num; i++){
        arr.push(i)
    }

    return arr
}

export const calNumPage = (max, total) => {
    var result = total/max
    if(total%max != 0){
        result += 1
    }
    return result
}
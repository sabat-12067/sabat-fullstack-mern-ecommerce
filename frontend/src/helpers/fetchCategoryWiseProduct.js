import SummaryApi from "../common/API"

const fetchCategoryWiseProduct = async(category) =>{
  const response = await fetch(`${SummaryApi.categoryWiseProduct.url}/${category}`,{
    method:"get"
  })

  const data = await response.json()
  // console.log(data)
  return data
}

export default fetchCategoryWiseProduct
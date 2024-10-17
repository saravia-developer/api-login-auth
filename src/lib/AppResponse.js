const AppResponse = (response) => {

  if(response instanceof Error)
    throw new Error(response.message)

  
}
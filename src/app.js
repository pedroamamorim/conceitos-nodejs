const express = require("express");
const cors = require("cors");

 const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //pega a lista de lista de repositórios e joga numa variável de mesmo nome

  //const repository = repositories;
  //mostra a lista de repositórios
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  /*const repositoryIndex = repositories.findIndex( repository => repository.id === id );

  if (repositoryIndex < 0) {
    return response.status(400).send('Repository doesnt exist')
  }
*/


/*if (!id){
  return response.status(400).send('Repository doesnt exist');
}*/

const repositoryIndex = repositories.findIndex( repository => repository.id === id );

if (repositoryIndex === -1) {
  return response.status(400).json( { error: 'Repository does not exist'})

}

  /*if (!repositoryOk){
    return response.status(400).send('Repository doesnt exist');
  }*/
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  }
  
  //alterando dados
  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
//procura pos no array que tá o rep
  const repositoryIndex = repositories.findIndex( repository => repository.id === id );

  //if (repositoryIndex < 0) {
    if (repositoryIndex >= 0) {
    //return response.status(400).send('Repository doesnt exist')
    repositories.splice(repositoryIndex,1);
    return response.status(204).send();
  } else {
    //return response.status(400).send('Repository doesnt exist')
    return response.status(400).send();
  }

  //repositories.splice(repositoryIndex,1);
  //return response.status(204).send();
  //return response.status(400).send('Repository doesnt exist')

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find( repository => repository.id === id );

  if (!repository){
    return response.status(400).send('Repository doesnt exist');
  }

  repository.likes ++;

  return response.json(repository);

});

module.exports = app;

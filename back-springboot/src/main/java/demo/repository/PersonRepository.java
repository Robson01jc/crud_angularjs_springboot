package demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import demo.model.Person;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "persons", path = "persons")
public interface PersonRepository extends CrudRepository<Person, Long> {

}
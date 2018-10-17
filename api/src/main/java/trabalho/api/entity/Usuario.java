package trabalho.api.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
public class Usuario {

	@Id
	@GeneratedValue
	private Long id;

	@Setter @Getter
	private String usuario;

	@Setter @Getter
	private String senha;

	@Setter @Getter
	private String nome;

	@Setter @Getter
	private String email;

	@Setter @Getter
	private String idioma;
}
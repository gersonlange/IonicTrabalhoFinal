package trabalho.api.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
public class Professores {

	@Id
	@GeneratedValue
	@Setter @Getter
	private Long id;

	@Setter @Getter
	private String nome;

	@Setter @Getter
	private String dataNascimento;
	
	@Setter @Getter
	@Lob
	private String foto;

	@Setter @Getter
	private String curriculo;

	@Setter @Getter
	private Boolean status;
}
package trabalho.api.entity;

import java.util.Date;

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
	private Long id;

	@Setter @Getter
	private String nome;

	@Setter @Getter
	private Date dataNascimento;
	
	@Setter @Getter
	@Lob
	private Byte[] foto;

	@Setter @Getter
	private String curriculo;

	@Setter @Getter
	private Boolean status;
}
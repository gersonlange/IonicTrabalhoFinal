package trabalho.api.model;

public class Token {

	private String token;
	private long data;
	
	public void setToken(String token) {
		this.token = token;
	}
	
	public String getToken() {
		return token;
	}
	
	public void setData(long data) {
		this.data = data;
	}
	
	public long getData() {
		return data;
	}
}

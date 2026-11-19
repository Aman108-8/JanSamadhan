package in.AY.JS.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class JsBackendApplication 
{
	public static void main(String[] args) {
		SpringApplication.run(JsBackendApplication.class, args);
	}
}

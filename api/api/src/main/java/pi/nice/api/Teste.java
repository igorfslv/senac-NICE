package pi.nice.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teste")
public class Teste {

    @RequestMapping("/hello")
    public ResponseEntity<String> carro() {
        System.out.println("hello world");
        return ResponseEntity.ok("carro");
    }
}

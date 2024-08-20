package pi.nice.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teste")
public class Teste {

    public ResponseEntity<String> carro() {
        return ResponseEntity.ok("carro");
    }
}

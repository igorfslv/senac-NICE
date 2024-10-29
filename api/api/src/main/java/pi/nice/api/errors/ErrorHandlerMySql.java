package pi.nice.api.errors;

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.UnexpectedTypeException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;
import pi.nice.api.errors.exceptions.DadosInvalidosException;

import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
public class ErrorHandlerMySql {

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity tratarErro400(SQLIntegrityConstraintViolationException ex) {
        var erros = ex.getMessage().split("'");


        return ResponseEntity.badRequest().body(new DadosErroValidacao(erros[3].split("\\.")[1],erros[1] + " já está em uso."));
    }

    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity tratarErro400(UnexpectedTypeException ex) {
        System.out.println(ex.getMessage());
        System.out.println(ex.getLocalizedMessage());
        return ResponseEntity.badRequest().build();
    }



    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity tratarErro400(ConstraintViolationException ex) {
        var erros = ex.getMessage().split("'");
        return ResponseEntity.badRequest().body(
                new DadosErroValidacao(ex.getMessage().split("propertyPath")[1].split(",")[0]
                        .replace("=", ""),erros[1]));
    }

    @ExceptionHandler(DadosInvalidosException.class)
    public ResponseEntity<?> tratorErro400(DadosInvalidosException e) {
        var erros = e.getMessage().split("/");
        return ResponseEntity.badRequest().body(new DadosErroValidacao(erros[0], erros[1]));
    }




    private record DadosErroValidacao(String campo, String mensagem) {
        public DadosErroValidacao(FieldError erro) {
            this(erro.getField(), erro.getDefaultMessage());
        }
    }
}

package pi.nice.api.errors;


import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pi.nice.api.errors.exceptions.SemAutorizacaoException;

@RestControllerAdvice
public class RequestExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity tratar404(EntityNotFoundException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CausaDTO(ex.getMessage()));
    }

    @ExceptionHandler(SemAutorizacaoException.class)
    public ResponseEntity tratar401(SemAutorizacaoException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new CausaDTO(ex.getMessage()));
    }

    private record CausaDTO(String causa) {

    }


}

package pi.nice.api.domain.produto;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = AvaliacaoValidator.class)
    @Target({ElementType.FIELD})
    @Retention(RetentionPolicy.RUNTIME)
    public @interface AvaliacaoValida {
        String message() default "Apenas avaliações de 0.5 em 0.5 de 0 até 5 são aceitas.";
        Class<?>[] groups() default {};
        Class<? extends Payload>[] payload() default {};
    }



package pi.nice.api.domain.produto;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AvaliacaoValidator implements ConstraintValidator<AvaliacaoValida, Double> {

    @Override
    public boolean isValid(Double value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        return value % 0.5 == 0 && value >= 0 && value <= 5;
    }
}

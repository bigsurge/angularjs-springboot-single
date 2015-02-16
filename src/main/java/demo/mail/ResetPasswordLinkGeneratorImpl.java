package demo.mail;

import demo.user.User;
import demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
class ResetPasswordLinkGeneratorImpl implements ResetPasswordLinkGenerator {

    @Value("${reset.password.link.port}")
    private int port;

    @Value("${reset.password.link.host}")
    private String host;

    private final ResetPasswordTokenHandler resetPasswordTokenHandler;

    @Autowired
    ResetPasswordLinkGeneratorImpl(UserRepository userRepository, ResetPasswordTokenHandler resetPasswordTokenHandler) {
        this.resetPasswordTokenHandler = resetPasswordTokenHandler;
    }

    @Override
    public String link(String username) {
        return "http://" + host + (port == 80 ? "" : ":" + port) + "/v1/users/password/edit?reset_password_token=" + getPasswordResetToken(username);
    }

    private String getPasswordResetToken(String username) {
        return resetPasswordTokenHandler.encrypt(username);
    }

}

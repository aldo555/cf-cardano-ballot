package org.cardano.foundation.voting.domain.discord;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Optional;
import org.cardano.foundation.voting.utils.WalletType;

@Getter
@Builder
@Setter
@ToString
public class DiscordCheckVerificationRequest {

    @NotBlank
    private String eventId;

    @NotBlank
    private String walletId;

    @Builder.Default
    private Optional<WalletType> walletType = Optional.of(WalletType.CARDANO);

    @NotBlank
    private String secret;

    @Builder.Default
    protected Optional<String> coseSignature = Optional.empty();

    @Builder.Default
    protected Optional<String> cosePublicKey = Optional.empty();

    @Builder.Default
    protected Optional<String> keriSignedMessage = Optional.empty();

    @Builder.Default
    protected Optional<String> keriPayload = Optional.empty();

    @Builder.Default
    protected Optional<String> oobi = Optional.empty();

}

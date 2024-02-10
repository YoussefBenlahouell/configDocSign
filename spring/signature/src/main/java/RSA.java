import java.security.*;
import java.util.Arrays;

public class RSA {
public static void main ( String[]args ) throws Exception {
    KeyPairGenerator keyPairGenerator =KeyPairGenerator .getInstance("RSA");
    keyPairGenerator.initialize(1024);

    KeyPair keyPair =keyPairGenerator.generateKeyPair();
    PrivateKey privateKey=keyPair.getPrivate();
    PublicKey publicKey=keyPair.getPublic();
    System.out.println("private ************************");
    System.out.println(Arrays .toString(privateKey.getEncoded()));
    System.out.println("public ************************");
    System.out.println(Arrays.toString(publicKey.getEncoded()));
}
}

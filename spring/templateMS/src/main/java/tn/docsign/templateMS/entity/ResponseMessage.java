package tn.docsign.templateMS.entity;

public class ResponseMessage {
    private String message;
    private String id;
      private Object result;
    public Object getResult() {
        return result;
    }

    public ResponseMessage(String message, String id, Object result) {
        this.message = message;
        this.id = id;
        this.result = result;
    }

    public void setResult(Object result) {
        this.result = result;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ResponseMessage(String message) {
        this.message = message;
    }

    public ResponseMessage(String message, String id) {
        this.message = message;
        this.id = id;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
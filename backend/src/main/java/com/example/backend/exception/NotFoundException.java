package com.example.backend.exception;

public class NotFoundException extends CustomException{
    public NotFoundException(){
        super(("Not found!"));
    }
}

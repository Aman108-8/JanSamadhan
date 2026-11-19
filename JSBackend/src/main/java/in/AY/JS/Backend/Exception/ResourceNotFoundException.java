package in.AY.JS.Backend.Exception;

import java.util.UUID;

public class ResourceNotFoundException extends RuntimeException
{
	String resourceName;
	String fieldName;
	String phoneNo;
	
	public ResourceNotFoundException(String resourceName, String fieldName, String phoneNo) {
		super(String.format("%s not found with %s : %s", resourceName, fieldName, phoneNo));
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.phoneNo = phoneNo;
	}
	
	
}

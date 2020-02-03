global class MyCustomPickList extends VisualEditor.DynamicPickList{
    
    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('test', 'TEST');
        return defaultValue;
    }
    global override VisualEditor.DynamicPickListRows getValues() {

        VisualEditor.DynamicPickListRows myValues = new VisualEditor.DynamicPickListRows();
        
        for (Document__c file : [ SELECT Id, Name FROM Document__c ] ) {
            myValues.addRow(
                new VisualEditor.DataRow(
                    file.Name, 
                    String.valueOf(file.Id)
                )
            );
        }

        return myValues;
    }
}
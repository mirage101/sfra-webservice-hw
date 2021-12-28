var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var {File, FileWriter, CSVStreamWriter} = require('dw/io');


module.exports.execute = function(){
    var newsletterObjectIterator = CustomObjectMgr.getAllCustomObjects('Subscription');

    
    var file = new File([File.IMPEX, 'test', 'text.csv'].join(File.SEPARATOR));
    var fileWriter= new FileWriter(file);
    var xsw = new CSVStreamWriter(fileWriter);

    try{
        xsw.writeStartDocument();
        xsw.writeStartElement("subscribers");

        while(newsletterObjectIterator.hasNext()){
            var newsletter = newsletterObjectIterator.next();
            xsw.writeStartElement("subscriber");
            xsw.writeAttribute("firstName", "newsletter.custom.firstName");
            xsw.writeEndElement("lastName", "newsletter.custom.lastName");
            xsw.writeEndElement("email", "newsletter.custom.email");
            xsw.writeEndElement("gender", "newsletter.custom.gender");
        }
        xsw.writeEndElement();
    } catch (e){

    } finally {
        xsw.close();
        fileWriter.close();
    }
    
}
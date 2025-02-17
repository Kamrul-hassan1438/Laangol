import dill

class CustomUnpickler(dill.Unpickler):
    def find_class(self, module, name):
        # Here you can add custom logic for specific module or class names
        if module == 'some.custom.module' and name == 'CustomClass':
            # Handle special cases for loading specific classes
            from some.custom.module import CustomClass
            return CustomClass
        # For everything else, use the default unpickling behavior
        return super().find_class(module, name)

def custom_load(file_path):
    """
    Custom loader using CustomUnpickler to load objects from a file.
    """
    with open(file_path, 'rb') as file:
        return CustomUnpickler(file).load()

# Long Nguyen
# 1001247753
# 4/30/2021
# Windows - Windows Subsystem for Linux

test_comment = "" # For testing the case where there's a comment
depth = 0         # Tracking current depth
depth_sub = 0     # For going up depth levels after annotating
ignore_flag_quote = False     # For ignoring quote content
ignore_flag_comment = False     # For ignoring multiline comments content
nested_comment = 0

depthLines = ""

with open('input_single_line.txt', 'r') as file:          # Open and read the file, closing automatically
    depthLines = file.read().splitlines()         # Read the file, but strip the newlines platform independently

for line in depthLines:
    # For the case when ignore the rest of the line
    ignore_line = False

    # Parse each character determining lexical contexts
    for c in line:
        # Possibility of a comment
        if (test_comment == "" and (c == '/' or c == '*')):
            test_comment += c
        elif (test_comment != ""):
            test_comment += c

            # If it's a single line comment
            if (test_comment == "//"):
                test_comment = ""
                ignore_line = True
            # if it's a multi-line comment
            elif (test_comment == "/*"):
                test_comment = ""

                if (ignore_flag_comment == True):
                    nested_comment += 1
                else:
                    ignore_flag_comment = True
                original_depth = depth

            # If it's the end of a multi-line comment
            elif (test_comment == "*/" and depth == original_depth):
                test_comment = ""

                if (nested_comment > 0):
                    nested_comment -= 1
                else:
                    ignore_flag_comment = False
            
            test_comment = ""
        
        # If we're not ignoring anything at the moment
        if (ignore_flag_quote == False and ignore_line == False and ignore_flag_comment == False):
            # Ignore quoted material
            if (c == "\""):
                ignore_flag_quote = True
                continue
            else:
                # If it's a brace, we're going deeper, but if it's an end brace, we're going higher
                if (c == "{"):
                    depth += 1
                elif (c == "}"):
                    depth_sub += 1

        # We've reached an endquote, so we'll be detecting depth again
        elif (c == "\""):
            ignore_flag_quote = False
        
    # Annotate
    print(str(depth) + " " + line)
    
    # Go up on depth if there is any reason to
    depth -= depth_sub
    depth_sub = 0 # Reset the times we went up

# If things didn't even out, then there's a missing brace somewhere
if (depth > 0):
    print("ERROR: Expected \'}\' but found EOF")
if (depth < 0):
    print("ERROR: Expected \'{\' but found EOF")
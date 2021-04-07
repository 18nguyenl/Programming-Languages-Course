# Long Nguyen
# 1001247753
# 4/6/2021
# Windows Subsystem for Linux (Ubuntu)

import os
import re

definedOperators = ['+', '-', '*', '/']         # A list of operators defined for RPN lines
def calculate(operand1, operand2, operator):    # Function given 2 operands and an operator to calculate the expression
    if (operator == '+'):                       # The calculation logic given an operator
        return operand1 + operand2
    elif (operator == '-'):
        return operand1 - operand2
    elif (operator == '*'):
        return operand1 * operand2
    elif (operator == '/'):
        return operand1 / operand2 
    else:
        print('ERROR: Invalid Operator')        # If there was a typo or undefined operator

rpnLines = ""                                   # Result of reading the file
operands = []                                   # Stack used to keep track of operands

with open('input_RPN.txt', 'r') as file:        # Open and read the file, closing automatically
    rpnLines = file.read().splitlines()         # Read the file, but strip the newlines platform independently

for line in rpnLines:                           # Process each RPN line
    lineArr = line.split(" ")                   # Split each operand and operator into individual list elements
    result = 0                                  # Result of the calculation
    
    for op in lineArr:                          # Process each operator and operand in the line
        if (op.isnumeric()):                    # If it's some number
            operands.append(int(op))            # Add it to the stack
        elif (op in definedOperators):
            operand2 = operands.pop()           # Get the ending operand
            operand1 = operands.pop()           # Get the beginning operand

            result = calculate(operand1, operand2, op) # C A L C U L A T E and store the result here
            
            operands.append(result)             # Store the calculation for the given operator back in the stack
    result = operands.pop()                     # Everything's been processed, so get the last result
    print(result)                               # Output the final answer 

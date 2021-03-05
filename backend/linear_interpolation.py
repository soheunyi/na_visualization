import argparse
import numpy

parser = argparse.ArgumentParser(description="Linear interpolation")

parser.add_argument('-xl', '--x-list', type=float, nargs='+', help='enter x values', required=True)
parser.add_argument('-yl', '--y-list', type=float, nargs='+', help='enter y values', required=True)

args = parser.parse_args()

print(args.x_list, args.y_list)

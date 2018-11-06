import ujson
from pprint import pprint


#########################################################
# Script to convert json data file in the right js format
#########################################################

def convert(infile='persons.json', outfile='data.js'):

    container = []
    frame_ctr = 0
    frame_step = 1

    with open(infile) as f:
        data = ujson.load(f)       

        for item in data:
        
            # Fill empty frames
            if (frame_ctr < item['frame_id']-frame_step):
                for i in range(frame_ctr, item['frame_id']-frame_step+1, frame_step):
                    container.append({
                        "frameID": i,
                        "persons": []
                    })
            frame_ctr = item['frame_id']

            # Combine
            if (len(container) > 0 and container[-1]["frameID"] == item['frame_id']) :
                del item['frame_id']
                container[-1]["persons"].append(item)
            # New
            else:
                frameID = item['frame_id']
                del item['frame_id']
                container.append({
                    "frameID": frameID,
                    "persons": [item]
                })

    striingified = ujson.dumps(container)

    with open(outfile, "w") as text_file:
        text_file.write("person_data = '" + striingified + "'")

if __name__ == "__main__":
    convert(infile='json5.json')
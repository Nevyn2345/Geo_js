from django.test import TestCase
import logging

class GeogameViewsTestCase(TestCase):
    fixtures = ['geogame_testdata.json']
    
    def test_index(self):
        resp = self.client.get('/geogame/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('location' in resp.context)
